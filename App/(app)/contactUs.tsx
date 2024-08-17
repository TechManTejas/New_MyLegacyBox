import React from 'react'
import WebView from 'react-native-webview'

const ContactUs = () => {
  return (
    <WebView
      source={{ uri: `${process.env.EXPO_PUBLIC_OICONOMOS_WEBSITE}/` }}
      style={{ flex: 1 }}
    />
  )
}

export default ContactUs