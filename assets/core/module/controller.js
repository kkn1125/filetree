/**!
 * Copyright 2022. kkn1125 All rights reserved.
 * 
 * 파일 트리 파싱 : 데모 페이지 이벤트 제어
 * 
 * @author    kimson <chaplet01@gmail.com>
 * @github    https://github.com/kkn1125
 * @written   2022-04-19 13:07:01
 * @modified  2022-04-21 11:32:29
 * @since     v0.1.0
 * @currently v0.2.2
 */

"use strict";

import {
    SAMPLE_ORDERED_NAME
} from "../../src/script/sample.js";

import {
    isBase
} from "../store.js";

import {
    getElement
} from "./parts/constant.js";

const LOCALS = ["localhost", "127.0.0.1"];
const DEMO = "https://kkn1125.github.io/treeparser/";

const Controller = function () {
    let models;
    this.init = function (model) {
        models = model;

        if(isBase(...LOCALS, DEMO)) {
            window.addEventListener("keyup", this.handleInput);
            window.addEventListener("click", this.clipboardCopy);
            
            // 샘플 텍스트
            setTimeout(() => {
                models.renderParsedTree(SAMPLE_ORDERED_NAME);
            }, 10);
        }
    }

    // istanbul ignore next
    this.clipboardCopy = function (e) {
        const target = e.target;
        
        if(target.id !== "copy") return;
        getElement("#copy").innerHTML += "✅";

        setTimeout(() => {
            getElement("#copy").innerHTML = "Copy";
        }, 3000);

        navigator.clipboard.writeText(getElement("#app").outerHTML).then(function() {
            console.log("Async: Copying to clipboard was successful!");
        }, function(err) {
            console.error("Async: Could not copy text: ", err);
        });
    }

    // istanbul ignore next
    this.handleInput = function (e) {
        const target = e.target;
        
        if(target.id !== "inputs") return;

        models.renderParsedTree(getElement("#inputs").value || SAMPLE_ORDERED_NAME, getElement("#app"));
    }
}

export {Controller};