function Diplay({children , active , label}){
    if(active === label){
        return children
    }
    return null
}

export default Diplay;