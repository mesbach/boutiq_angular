import { Injectable } from "@angular/core";
import { Globals } from "../global";

@Injectable()
export class FilterTools {

    constructor(
        private globals: Globals
    ) { }

    asCoalesceVar(val, val2) {
        if (this.globals.isNotNullNotUndef(val)) {
            return val;
        }
        if (this.globals.isNotNullNotUndef(val2)) {
            return val2;
        }
        return null;
    }

    asFilterKategori(filterOrigin, filterNew) {
        if (this.globals.isNotNullNotUndef(filterOrigin) && this.globals.isNotNullNotUndef(filterNew)) {
            if (this.globals.isNotNullNotUndef(filterNew["kategori"])) {
                let kategori = filterNew["kategori"].toString();
                if (kategori.toString().length > 0) {
                    filterOrigin["mPro.kategori_produk"] = kategori;
                }
            }
        }
    }

    asFilterWarna(filterOrigin, filterNew) {
        if (this.globals.isNotNullNotUndef(filterOrigin) && this.globals.isNotNullNotUndef(filterNew)) {
            if (this.globals.isNotNullNotUndef(filterNew["warna"])) {
                let warna = filterNew["warna"].toString();
                if (warna.length > 0) {
                    filterOrigin["mPro.warna_produk"] = warna;
                }
            }
        }
    }

    asFitlerHarga(filter) {
        let hargaMin = "";
        let hargaMax = "";
        let result = {};
        if (this.globals.isNotNullNotUndef(filter)) {
            if (this.globals.isNotNullNotUndef(filter["harga"])) {
                let harga = filter["harga"];
                if (this.globals.isNotNullNotUndef(harga["min"])) {
                    hargaMin = harga["min"].toString();
                }
                if (this.globals.isNotNullNotUndef(harga["max"])) {
                    hargaMax = harga["max"].toString();
                }

                if (hargaMin.length > 0 || hargaMax.length > 0) {
                    result["c"] = "price";
                    if (hargaMin.length > 0) {
                        result["min"] = hargaMin;
                    }
                    if (hargaMax.length > 0) {
                        result["max"] = hargaMax;
                    }
                }
            }
        }

        return result;
    }

    asFilterSort(filter) {
        let result = [];
        if (this.globals.isNotNullNotUndef(filter["sort"]) && this.globals.isNotNullNotUndef(filter["options"])) {
            let sort = filter["sort"];
            let options = filter["options"];
            let selected = this.globals.getObjectInArray(options, { val: sort });
            if (selected != null) {
                result.push(selected["column"]);
                result.push(selected["dir"]);
            }
        }
        return result;
    }

    asLimit(page, limit) {
        if (page == undefined) {
            page = 1;
        }
        if (isNaN(page)) {
            page = 1;
        }

        if (limit == undefined) {
            limit = 4;
        }
        if (isNaN(limit)) {
            limit = 4;
        }

        let offset = (page - 1) * limit;
        return [offset, limit];
    }

    asFilterKeyword(filter) {
        let result = {};
        if (this.globals.isNotNullNotUndef(filter)) {
            if (this.globals.isNotNullNotUndef(filter["keyword"])) {
                let keyword = filter["keyword"].toString();
                if (keyword.length > 0) {
                    result["k"] = keyword;
                    result["c"] = [
                        "_.nama_product"
                    ];
                }
            }
        }
        return result;
    }
}