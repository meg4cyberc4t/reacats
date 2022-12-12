import React, { useContext, useState } from "react";
import { Ctx } from "../../App";
import EditIcon from "../../assets/edit_icon.svg";
import FavIcon from "../../assets/favorite_icon.svg";
import FavIconActive from "../../assets/favorite_icon_active.svg";
import "./style.css";

const getAgeString = (age) => {
    if (age < 10 || age > 20) {
        if (age % 10 == 1) {
            return age += " год";
        }
        else if (age % 10 == 2 || age % 10 == 3 || age % 10 == 4){
            return age += " года";
        }
        else {
            return age += " лет";
        }
    }
    else {
        return age += " лет";
    }
}


export default ({cat}) => {
    const [like, setLike] = useState(cat.favorite);

    const {Api, setModalState, setCurCatId, cats, setCurName, setCurAge, setCurRate, setCurImage, setCurDescription, setCurFavorite} = useContext(Ctx);
    
    const HandleFavorite = (id) => {
        let newCat = cats.find(cat => cat.id == id);
        newCat.favorite = !like;
        Api.updateCat(id, newCat);
        setLike(!like);
    }

    let ageString = getAgeString(cat.age);

    const startEdit = (id) => {
        let newCat = cats.find(cat => cat.id == id);

        setCurName(newCat.name ? newCat.name : "");
        setCurImage(newCat.image ? newCat.image : "");
        setCurAge(newCat.age ? newCat.age : "");
        // TODO: получать rate из сердечек
        setCurRate(newCat.rate ? newCat.rate : "");
        setCurDescription(newCat.description ? newCat.description : "");  
        setCurFavorite(newCat.favorite ? newCat.favorite : false);
        setCurCatId(id);
        
    }

    return <div className="card">
        <button className="favorite_btn" onClick={() => HandleFavorite(cat.id)}>
            <img src={like ? FavIconActive : FavIcon}/>
        </button>
        {cat.image && <img className="card-img-top" src={cat.image}/>}
        <div className="card-body" onClick={() => { startEdit(cat.id); setModalState(true); }}>
            <div className="body_top">
                <h5 className="card-title">{cat.name} - {ageString}</h5>
                <button className="edit_btn">
                    <img src={EditIcon}/>
                </button>
            </div>
            <div className="rating">
                <i>Рейтинг этой кошечки: {cat.rate}</i>
            </div>
            <p className="card-text">{cat.description}</p>
        </div>
    </div>
}