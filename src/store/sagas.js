import { all, fork } from "redux-saga/effects"

import Alert from "./Alert/saga"

//public
import AuthSaga from "./auth/login/saga"
import ForgetSaga from "./auth/forgetpwd/saga"
import Register from "./auth/register/saga"

// Billing
import Billing from "./Billing/saga"

// File
import FileSaga from "./File/saga"

// Customers
import customers from "./customers/saga"

// Campaigns
import Campaigns from "./Campaigns/campaign/saga"
import CampaignTemplate from "./Campaigns/campaign_template/saga"

// Faqs
import faqs from "./faq/saga"

// Roles
import roles from "./SystemAccess/roles/saga"

// SubAdmins
import subAdmins from "./SystemAccess/subAdmins/saga"

//Blog Category
import blogCategory from "./Blogs/category/saga"

//Blog Tag
import tagCategory from "./Blogs/tag/saga"

//Blog
import blog from "./Blogs/blog/saga"

// Promo Codes
import promocodes from "./promocodes/saga"

// Promotions
import promotions from "./promotions/saga"

// Gallery
import gallery from "./gallery/saga"

// Content Pages
import contentpages from "./contentpages/saga"

// Menu
import menus from "./menus/saga"

// Email Templates
import emailtemplates from "./emailtemplates/saga"

// Notifications
import notifications from "./notifications/saga"

// Transactions
import transactions from "./transactions/saga"

// Document Templates
import documentTemplates from "./DocumentTemplates/saga"

// Food Delivery module
import fdRestaurants from "./FoodDelivery/restaurants/saga"
import fdDrivers from "./FoodDelivery/drivers/saga"
import fdAttributes from "./FoodDelivery/attributes/saga"
import fdCategories from "./FoodDelivery/categories/saga"
import fdAddons from "./FoodDelivery/addons/saga"
import fdProducts from "./FoodDelivery/products/saga"
import fdCuisines from "./FoodDelivery/cuisine/saga"
import fdBusinesstypes from "./FoodDelivery/businessType/saga"
import fdSettings from "./FoodDelivery/Settings/saga"

// Orders
import fdOrders from "./FoodDelivery/orders/saga"

// Requests
import fdRequests from "./FoodDelivery/requests/saga"

//terminologies
import terminologies from "./terminologies/saga"

// Settings
import Settings from "./Settings/saga"

import ProfileSaga from "./auth/profile/saga"
import LayoutSaga from "./layout/saga"
import domainSaga from "./domain/saga"
import orderReportSaga from "./reports_all/orders/saga"
import CustomerReportSaga from "./reports_all/users/saga"
import DashboardSaga from "./dashboard/saga"
import TrackSaga from "./track/saga"

// Geofencing
import geofencing from "./geofencing/saga"

//Dispute
import DisputeSaga from "./FoodDelivery/dispute/saga"

//Dipatch
import DispatchSaga from "./dispatch/saga"

// Reviews
import ReviewsSaga from "./reviews/saga"

import PackageServiceVendor from "./PackageServices/Vendors/saga"
import PackageServicePackage from "./PackageServices/Packages/saga"
import ProductBatchSaga from "./ProductBatch/saga"

export default function* rootSaga() {
  yield all([
    fork(DashboardSaga),
    fork(Alert),
    fork(AuthSaga),
    ProfileSaga(),
    ForgetSaga(),
    Register(),
    LayoutSaga(),
    fork(Billing),
    fork(FileSaga),
    fork(customers),
    fork(Campaigns),
    fork(CampaignTemplate),
    fork(faqs),
    fork(roles),
    fork(subAdmins),
    fork(promocodes),
    fork(promotions),
    fork(gallery),
    fork(contentpages),
    fork(menus),
    fork(emailtemplates),
    fork(notifications),
    fork(transactions),
    fork(documentTemplates),
    fork(fdRestaurants),
    fork(fdOrders),
    fork(fdRequests),
    fork(fdDrivers),
    fork(fdAttributes),
    fork(fdCategories),
    fork(fdAddons),
    fork(fdProducts),
    fork(fdCuisines),
    fork(fdBusinesstypes),
    fork(fdSettings),
    fork(terminologies),
    fork(Settings),
    fork(domainSaga),
    fork(orderReportSaga),
    fork(CustomerReportSaga),
    fork(TrackSaga),
    fork(geofencing),
    fork(DisputeSaga),
    fork(DispatchSaga),
    fork(ReviewsSaga),
    fork(blogCategory),
    fork(tagCategory),
    fork(blog),
    fork(ProductBatchSaga),
    PackageServiceVendor,
    PackageServicePackage,
  ])
}
