import React from 'react';

function Switch({ checked, callback, on, off }) {
    const id = Date.now();
    return (
        <>
            <div className="switch-l square-switch">
                <input
                    type="checkbox"
                    id={"stock-status-switch1" + id}
                    switch="none"
                    checked={checked}
                    onChange={callback}
                />
                <label
                    htmlFor={"stock-status-switch1" + id}
                    data-on-label={on}
                    data-off-label={off}
                />
            </div>
        </>
    );
}

export default Switch;
