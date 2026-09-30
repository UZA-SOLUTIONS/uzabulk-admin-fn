#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.join(__dirname, "..");
let failed = 0;

const assert = (condition, message) => {
    if (!condition) {
        failed += 1;
        console.error(`FAIL: ${message}`);
        return;
    }
    console.log(`ok: ${message}`);
};

const read = (rel) => fs.readFileSync(path.join(root, rel), "utf8");

const loadImageHelpers = () => {
    const source = read("src/pages/FoodDelivery/Product/utils/productImages.js")
        .replace(/export const /g, "const ");
    const context = { module: { exports: {} }, exports: {}, console };
    vm.runInNewContext(
        `${source}\nmodule.exports = { productImageUrl, productImageKey, filesFromProductImages, truncateText };`,
        context
    );
    return context.module.exports;
};

const main = () => {
    console.log("== product form / saga wiring ==");
    const addEdit = read("src/pages/FoodDelivery/Product/AddEdit/index.js");
    assert(addEdit.includes("onAddFdProduct"), "Add still submits through add saga");
    assert(addEdit.includes("onPutFdProduct"), "Edit still submits through update saga");
    assert(addEdit.includes("WHOLESALE_PRODUCT_FORM"), "wholesale form is used");
    assert(addEdit.includes("uploadProductImages") || read("src/pages/FoodDelivery/Product/AddEdit/Images/index.js").includes("uploadProductImages"), "images dropzone uses uploads API");
    assert(addEdit.includes("FeatureSpecs"), "specs section is on the form");
    assert(addEdit.includes("uploadingImages"), "save waits on in-flight image uploads");

    const saga = read("src/store/FoodDelivery/products/saga.js");
    assert(!saga.includes("image_required"), "saga does not require featured_image");
    assert(saga.includes("postFdProduct"), "add saga still posts products");
    assert(saga.includes("putFdProduct"), "update saga still puts products");
    assert(saga.includes("deleteFdProduct"), "archive saga still deletes/archives");

    const helper = read("src/helpers/backend_helper.js");
    assert(helper.includes("UPLOAD_PRODUCT_IMAGES"), "upload helper exists");
    assert(helper.includes('formData.append("files"'), "upload sends files field");

    const urls = read("src/helpers/url_helper.js");
    assert(urls.includes('UPLOAD_PRODUCT_IMAGES = "/uploads/images"'), "upload path is /uploads/images");

    const sidebar = read("src/components/VerticalLayout/SidebarContent/Admin/index.js");
    assert(sidebar.includes("getCatalogProductsPath"), "sidebar Products item is wired");

    const constants = read("src/helpers/contants.js");
    assert(constants.includes("key: \"products\""), "sidebar Products menu key exists");
    assert(constants.includes("WHOLESALE_PRODUCT_FORM"), "WHOLESALE_PRODUCT_FORM exists");
    assert(constants.includes("product: \"Product\""), "grocery product path uses Product");

    const listColumns = read("src/pages/FoodDelivery/Product/List/ListColumns.js");
    assert(listColumns.includes("featured_image"), "list shows thumbnail");
    assert(listColumns.includes("truncateText"), "list truncates names");
    assert(listColumns.includes("dataField: \"price\""), "list shows price");

    const imagesUi = read("src/pages/FoodDelivery/Product/AddEdit/Images/index.js");
    assert(imagesUi.includes("15 * 1024 * 1024"), "product image dropzone allows 15MB");
    assert(imagesUi.includes("Max. upload file size: 15MB"), "product form shows 15MB limit");

    console.log("\n== image helpers ==");
    const {
        productImageUrl,
        productImageKey,
        filesFromProductImages,
        truncateText,
    } = loadImageHelpers();

    assert(
        productImageUrl("http://localhost:3090/authenticationservice/api/v1/uploads/products/a.jpg") ===
            "http://localhost:3090/authenticationservice/api/v1/uploads/products/a.jpg",
        "GridFS URL previews as-is"
    );
    assert(productImageUrl({ link: "https://cdn.example/x.jpg" }) === "https://cdn.example/x.jpg", "File {link} still previews");
    assert(productImageKey("https://cdn.example/x.jpg") === "https://cdn.example/x.jpg", "URL key is the URL");
    const files = filesFromProductImages("https://cdn.example/a.jpg", ["https://cdn.example/a.jpg", "https://cdn.example/b.jpg"]);
    assert(files.length === 2, "featured is not duplicated in gallery files");
    assert(truncateText("a".repeat(90), 80).endsWith("…"), "long names are truncated");

    if (failed) {
        console.error(`\n${failed} check(s) failed`);
        process.exit(1);
    }
    console.log("\nproduct CRUD checks passed");
};

main();
