import { Viaje } from "../models/Viaje.js";
import { Testimonial } from "../models/Testimoniales.js";

const paginaInicio = async (req, res) => {

    // Cuando hay múltiples await es mejor trabajar con un promise para que demore la ejecución del código
    const promiseDB = [];

    promiseDB.push( Viaje.findAll({limit: 3}) );// Muestra sólo 3 elementos 
    promiseDB.push( Testimonial.findAll({limit: 3}) );// Muestra sólo 3 elementos

    try {
        const resultado = await Promise.all(promiseDB);

        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],//resultado[0] en la posición cero 
            testimoniales: resultado[1]//resultado[1] en la posición uno
        });
    } catch (error) {
        console.log(error)
    }
    
}

const paginaNosotros = (req, res) => {// req lo que enviamos y res lo que express nos responde
    res.render('nosotros', {
        pagina: 'Nosotros'
    });
}

const paginaViajes = async (req, res) => {
    // Consultar la BD
    const viajes = await Viaje.findAll();

    console.log(viajes);

    res.render('viajes', {
        pagina: 'Próximos Viajes',
        viajes
    });
}

const paginaTestimoniales = async (req, res) => {    

    try {
        const testimoniales = await Testimonial.findAll();
        
        res.render('testimoniales', {
            pagina: 'Testimonales',
            testimoniales
        });
    } catch (error) {
        console.log(error)
    }   
}

// Muestra un viaje por su slug
const paginaDetalleViaje = async (req, res) => {    

    const { slug } = req.params;

    try {
        const viaje = await Viaje.findOne( { where : { slug } });

        res.render('viaje', {
            pagina: 'Información Viaje',
            viaje
        })
    } catch (error) {
        console.log(error)
    }
}

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}

