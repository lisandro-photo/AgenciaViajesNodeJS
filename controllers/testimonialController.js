import { Testimonial } from "../models/Testimoniales.js";

const guardarTestimonial = async (req, res) => {

    // Validar...
    const { nombre, email, mensaje } = req.body;

    const errores = [];

    if (nombre.trim() === '') {
        errores.push({mensaje: 'El nombre está vacio'});    
    }
    
    if (email.trim() === '') {
        errores.push({mensaje: 'El Correo está vacio'});    
    }

    if (mensaje.trim() === '') {
        errores.push({mensaje: 'El Mensaje está vacio'});    
    }

    if(errores.length > 0) {

        // Consultar Testimoniales existentes
        const testimoniales = await Testimonial.findAll();

        // Mostrar la vista con errores
        res.render('testimoniales', {
            pagina: 'Testimonales',
            errores,
            nombre,
            email,
            mensaje,
            testimoniales
        })
    } else {
        // Almacenar en la Base de Datos

        try {
            await Testimonial.create({
                nombre,
                email,
                mensaje
            });

            res.redirect('/testimoniales');
        } catch (error) {
            console.log(error);
        }
    }
}

export {
    guardarTestimonial
}