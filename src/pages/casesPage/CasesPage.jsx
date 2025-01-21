import React from "react";
import { SpecificHero, MostSeledCases } from "./components";
import { InformationSection } from "../../components/common";
import { ProductCatalog } from "../../components/layout/ProductCatalog";
import { Navbar, Footer } from "../../components/layout";

const CasesPage = () => {
    return (
        <>
            <Navbar />
            <SpecificHero />
            {/*Carrusel Option 1*/}
            <MostSeledCases />
            {/*Carrusel Option 2*/}
            <InformationSection
                srcImg={"https://i.ibb.co/gJBD1zS/Card-Prueba-4.jpg"}
                desc={"Nuestros Case🔥"}
                txt1={"Nuestros case para iPhone está diseñado para ofrecer una protección óptima sin sacrificar el estilo. Hecho con materiales de alta calidad, proporciona una defensa robusta contra caídas y rayaduras mientras mantiene el diseño elegante y delgado de tu dispositivo."}
                txt2={"Disponibles en una variedad de colores y diseños, nuestros cases se ajustan perfectamente a cada modelo de iPhone, asegurando un ajuste perfecto y un acceso fácil a todos los botones y puertos."}
            />
            <ProductCatalog />
            <Footer />
        </>
    )
}

export default CasesPage;