import { Injectable, isDevMode } from '@angular/core';
import swal from "sweetalert2";

@Injectable()
export class Globals {

    isLoggedIn                      : boolean = false;
    showHeader                      : boolean = true;

    apiBaseUrl                      : string = isDevMode() ? "http://localhost/aulia/" : "http://aulia2.idcosci.com/";
    // apiBaseUrl                      : string = "http://localhost/aulia/";
    // apiBaseUrl                      : string = "http://aulia2.idcosci.com/";
    apiSiteUrl                      : string = this.apiBaseUrl + "index.php/";

    apiLoginUrl                     : string = this.apiSiteUrl + "sim/login/do_login_json";
    apiSignupUrl                    : string = this.apiSiteUrl + "sim/registrasi/mendaftar";
    apiCheckIfLoggedIn              : string = this.apiSiteUrl + "sim/login/is_logged_in";
    apiGetProfile                   : string = this.apiSiteUrl + "ecp_home/profile/my_profile";
    apiLogoutUrl                    : string = this.apiSiteUrl + "sim/login/logout_json";
    apiAktivasiAkun                 : string = this.apiSiteUrl + "sim/registrasi/aktivasi";
    apiResendActivationEmail        : string = this.apiSiteUrl + "sim/registrasi/resend_activation_email";
    apiRequestForgotPassword        : string = this.apiSiteUrl + "sim/registrasi/request_forgot_password";
    apiResetPassword                : string = this.apiSiteUrl + "sim/registrasi/reset_password";
    apiUpdatePassword               : string = this.apiSiteUrl + "ecp_home/profile/update_password";
    apiArticle                      : string = this.apiSiteUrl + "ecp_article/article/";
    apiArticleComment               : string = this.apiSiteUrl + "ecp_article/comments/";
    apiArticleCommentList           : string = this.apiSiteUrl + "ecp_article/article_comments/";
    apiProduct                      : string = this.apiSiteUrl + "ecp_home/product/";
    apiProductCarousel              : string = this.apiSiteUrl + "ecp_home/carousel/";
    apiProductBestSeller            : string = this.apiSiteUrl + "ecp_product/best_seller/";
    apiProductNewArrival            : string = this.apiSiteUrl + "ecp_product/new_arrival/";
    apiProductMostReview            : string = this.apiSiteUrl + "ecp_product/most_review/";
    apiWishList                     : string = this.apiSiteUrl + "ecp_shopping/wishlist/";
    apiCart                         : string = this.apiSiteUrl + "ecp_shopping/cart/";
    apiProfile                      : string = this.apiSiteUrl + "ecp_home/profile/";
    apiCheckout                     : string = this.apiSiteUrl + "ecp_shopping/checkout/";
    apiCheckoutDetail               : string = this.apiSiteUrl + "ecp_shopping/checkout_detail/";
    apiAlamatCustomer               : string = this.apiSiteUrl + "ecp_home/alamat_pengiriman/";
    apiProvinsi                     : string = this.apiSiteUrl + "ecp_home/provinsi/";
    apiKabupaten                    : string = this.apiSiteUrl + "ecp_home/kabupaten/";
    apiKecamatan                    : string = this.apiSiteUrl + "ecp_home/kecamatan/";
    apiKelurahan                    : string = this.apiSiteUrl + "ecp_home/kelurahan/";
    apiPaymentMethod                : string = this.apiSiteUrl + "ecp_shopping/payment_method/";
    apiPaymentTransaction           : string = this.apiSiteUrl + "ecp_shopping/payment_transaction/";
    apiReviewTransaction            : string = this.apiSiteUrl + "ecp_shopping/review/";
    apiRecentViewProduct            : string = this.apiSiteUrl + "ecp_home/recent_product_view/";
    apiPublicMessage                : string = this.apiSiteUrl + "ecp_home/public_message/";
    apiDeliveryFee                  : string = this.apiSiteUrl + "ecp_shopping/delivery_fee/"

    swalHttpError(err) {
        console.log("swal http error");
        if (err.message != undefined && err.name != undefined) {
            console.log("message and name are not undefined");
            swal({
                type: "error",
                title: err.name,
                text: err.message
            });
        } else {
            console.log("message or name is undefined");
        }
    }

    swalBlockUI(conf){
        swal({
            title: conf.title ? conf.title : "Harap Tunggu",
            text: conf.text ? conf.text : "Sedang memproses data",
            allowOutsideClick: false,
            showCancelButton: false,
            showConfirmButton: false,
            allowEscapeKey: false
        });
    }

    posObjectInArray(arr, filter) {
        // console.log("pos in array of object ", arr);
        // console.log("filter ", filter);
        for (var i = 0, i2 = arr.length; i < i2; i++) {
            var obj = arr[i];
            var all_match = true;
            for (var j in filter) {
                if (obj[j] != filter[j]) {
                    all_match = false;
                    break;
                }
            }

            if (all_match) {
                return i;
            }
        }
        return -1;
    }

    getObjectInArray(arr, filter) {
        var pos = this.posObjectInArray(arr, filter);
        if (pos >= 0) {
            return arr[pos];
        }
        return null;
    }

    

    isNotNullNotUndef(val){
        if(val != undefined && val != null){
            return true;
        }
        return false;
    }

    isSameObject(obj1, obj2){
        // console.log("type of");
        // console.log(typeof obj1);
        // console.log(typeof obj2);
        if(typeof obj1 == "object" && typeof obj2 == "object"){
            let res = true;
            for(let i1 in obj1){
                // if(obj2[i1] == undefined){
                    // debugger;
                    // return obj1[i1] == obj2[i1];
                // } else {
                    res = res && this.isSameObject(obj1[i1], obj2[i1]);
                // }
            }
            // debugger;
            return res;
        } else {
            // debugger;
            return obj1 == obj2;
        }
        // debugger;
        // return true;
    }
}