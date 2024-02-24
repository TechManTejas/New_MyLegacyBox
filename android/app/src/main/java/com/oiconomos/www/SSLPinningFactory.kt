package com.oiconomos.www

import com.facebook.react.modules.network.OkHttpClientFactory
import com.facebook.react.modules.network.OkHttpClientProvider
import okhttp3.CertificatePinner
import okhttp3.OkHttpClient

class SSLPinningFactory : OkHttpClientFactory {

    override fun createNewNetworkModuleClient(): OkHttpClient {
        val certificatePinner = CertificatePinner.Builder()
        .add("iam.oiconomos.com", "sha256/8kgKronNWo4bOZQe4pWNia2feb8t00kljjubBs0/HDU=")
        .add("internal-api.oiconomos.com", "sha256/UZlgjVJ3rZoUYrlvBz1ctyHN/lXUIV3T3ili8hM9PvQ=")
        .add("ifsc.razorpay.com", "sha256/F8JrlylzPh8K7JB8ZqonHriK+KW0EaxTJ33wRjqk12U=")
        .add("api.postalpincode.in", "sha256/iY5B9ZWEwk83VVRtL0v5k//BZnN4uUiWjq5EJPgWeaE=")

            .build()

        val clientBuilder = OkHttpClientProvider.createClientBuilder()
        return clientBuilder.certificatePinner(certificatePinner).build()
    }
}
