import React from 'react'
import { Navbar } from '../../components/layout'
import { HeroSection } from './components'
import useDocumentTitle from '../../utils/useDocumentTitle'

const ContactPage = () => {
    useDocumentTitle("FasTap | Contacto")
    return (
        <>
            <Navbar />
            <HeroSection />
            
        </>
    )
}

export default ContactPage