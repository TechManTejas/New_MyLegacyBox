import React from 'react'
import CustomWebView from '../../testApp/components/Common/CustomWebView'

const AboutUs = () => {
  return (
    <WebView
      source={{ uri: `${process.env.EXPO_PUBLIC_OICONOMOS_WEBSITE}/` }}
      style={{ flex: 1 }}
    />
  )
}

export default AboutUs