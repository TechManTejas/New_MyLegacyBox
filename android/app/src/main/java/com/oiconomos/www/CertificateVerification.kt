package com.oiconomos.www; 
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.Arguments

import android.os.Build

import android.content.pm.PackageInfo
import android.content.pm.PackageManager
import java.security.MessageDigest


class CertificateVerification(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
  
  @ReactMethod
  fun verifyAppSignatureCertificate(certificateSHA256List: ReadableArray, promise: Promise) {
        val packageManager: PackageManager = reactApplicationContext.packageManager
        val availableCertificateSHA256List = certificateSHA256List.toArrayList()

        try {
            val packageInfo =if(Build.VERSION.SDK_INT >= 28 ) packageManager.getPackageInfo("com.oiconomos.www", PackageManager.GET_SIGNING_CERTIFICATES ) else packageManager.getPackageInfo("com.oiconomos.www", PackageManager.GET_SIGNATURES)
            
            val signatures = if(Build.VERSION.SDK_INT >= 28 ) packageInfo.signingInfo.getApkContentsSigners() else packageInfo.signatures

            var signatureSha256HexList = Arguments.createArray() 

            // var result = Arguments.createMap()

            var isValidSignature = false;

            for (signature in signatures) {
                val signatureBytes = signature.toByteArray()

                val sha256Digest = MessageDigest.getInstance("SHA-256")

                sha256Digest.update(signatureBytes)

                val sha256Hash = sha256Digest.digest()

                val sha256Hex = bytesToHex(sha256Hash)

                // signatureSha256HexList.pushString(sha256Hex)

                isValidSignature = availableCertificateSHA256List.contains(sha256Hex)
            }

            // result.putBoolean("isValidSignature", isValidSignature)
            // result.putArray("signatures", signatureSha256HexList)

            promise.resolve(isValidSignature)
        }  catch (e: PackageManager.NameNotFoundException) {
            e.printStackTrace()
            // Reject the promise if package not found
            promise.reject("PACKAGE_NOT_FOUND", "Package not found: com.oiconomos.www")
        } catch (e: Exception) {
            e.printStackTrace()
            // Reject the promise if any other exception occurs
            promise.reject("ERROR", "An error occurred while retrieving the signature: ${e.message}")
        }
  }

   private fun bytesToHex(bytes: ByteArray): String {
        val hexArray = "0123456789ABCDEF".toCharArray()
        val hexChars = CharArray(bytes.size * 2)
        for (j in bytes.indices) {
            val v: Int = bytes[j].toInt() and 0xFF
            hexChars[j * 2] = hexArray[v ushr 4]
            hexChars[j * 2 + 1] = hexArray[v and 0x0F]
        }
        return String(hexChars)
    }


  override fun getName() = "CertificateVerification"
}

