import { Injectable } from "@angular/core";

@Injectable()
export class TransactionTools {
    constructor(
    ) { }

    setStatusTransaksi(transaksi) {
        let stts = this.asStatusTransaksi(transaksi);

        transaksi.statusPaymentText = stts.status_name;
        transaksi.showPaymentExpiration = stts.showPaymentExpiration;
        transaksi.showAddPayment = stts.showAddPayment;
        transaksi.showStatusDelivery = stts.showStatusDelivery;
        transaksi.statusDeliveryText = stts.statusDeliveryText;
    }

    asStatusTransaksi(transaksi) {
        var result = {
            status_name: "Status pembayaran tidak diketahui",
            showPaymentExpiration: false,
            showAddPayment: false,
            showStatusDelivery: false,
            statusDeliveryText: ""
        };
        switch (transaksi.payment_status) {
            case "0":
                result.status_name = "Menunggu Pembayaran";
                result.showPaymentExpiration = true;
                result.showAddPayment = true;
                break;
            case "1":
                result.status_name = "Menunggu konfirmasi oleh admin";
                result.showAddPayment = true;
                break;
            case "2":
                result.status_name = "Pembayaran telah diterima";
                result.showStatusDelivery = true;
                break;
            case "3":
                result.status_name = "Kadaluarsa";
                break;
            case "4":
                result.status_name = "Pembayaran tidak lengkap";
                result.showPaymentExpiration = true;
                result.showAddPayment = true;
                break;
        }
        if (transaksi.payment_status == "2") {
            let stts = {
                0: "Belum Dikirim",
                1: "Sedang Diproses",
                2: "Dalam Pengiriman",
                3: "Telah Diterima",
                4: "Alamat tidak ditemukan"
            }

            let ds = transaksi.delivery_status;

            if (stts[ds] != undefined) {
                result.statusDeliveryText = stts[ds];
            }
        }
        return result;
    }
}