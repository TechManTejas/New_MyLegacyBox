import React from 'react'
import WebView from 'react-native-webview'

const ContactUs = () => {
  return (
    <WebView
      source={{ uri: "https://www.oiconomos.com" }}
      style={{ flex: 1 }}
    />
  )
}

export default ContactUs