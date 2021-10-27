window.sr = ScrollReveal();

    sr.reveal('.producto__lista-tortas',{
        duration: 1300,
        origin: 'bottom',
        distance: '-50px',
    });

    sr.reveal('.producto__lista-dulces',{
        duration: 1100,
        origin: 'bottom',
        distance: '-50px',
        delay: 500
    });

    sr.reveal('.producto__lista-postres',{
        duration: 900,
        origin: 'bottom',
        distance: '-50px',
        delay: 1000
    });

    //Para que se despliegue hacia abajo
    sr.reveal('.down',{
        duration: 1500,
        origin: 'down',
        distance: '-50px'
    });

    sr.reveal('.up',{
        duration: 1000,
        origin: 'top',
        distance: '-50px'
    });


    sr.reveal('.left',{
        duration: 1500,
        origin: 'left',
        distance: '-50px'
    });