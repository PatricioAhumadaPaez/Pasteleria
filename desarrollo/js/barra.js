
    const btn_menu = document.querySelector('.btn_menu');
    
    btn_menu.addEventListener('click', ()=>{
        const menu_items = document.querySelector('.menu_items')
        //*Si ya tiene la clase se la quita, si no se la pone
        menu_items.classList.toggle('mostrar')
    })
