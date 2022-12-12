import React, { useContext } from "react";
import { Ctx } from "../../App";
import "./style.css";

export default () => {
    const {Api, setCats, ids, curName, setCurName, curImage, setCurImage, curAge, setCurAge, curRate, setCurRate, curDescription, setCurDescription, setCurFavorite, curFavorite} = useContext(Ctx);


    const addFormHandler = (e) => {
        e.preventDefault();
        
        const body = {
            "id": Math.max.apply(null, ids) + 1,
            "name": curName,
            "image": curImage,
            "age": curAge ? curAge : 0,
            "rate": curRate ? curRate : 0,
            "favorite": curFavorite,
            "description": curDescription,
        }
        
        const result = Api.addCat(body);

        result.then(response => {
            setCurName("");
            setCurImage("");
            setCurAge("");
            setCurRate("");
            setCurDescription("");
            setCurFavorite(false);
    
            // не обновляется список...
            Api.getAll().then(data => setCats(data));
        })
    }

    return <div className="header">
            <div className="header_form_wrapper">
                <form onSubmit={addFormHandler}>
                    <input type="text" className="form-control" placeholder="Имя" name="name" value={curName} onChange={e => setCurName(e.target.value)}/>
                    <input type="text" className="form-control" placeholder="Ссылка на фотографию" name="image" value={curImage} onChange={e => setCurImage(e.target.value)}/>

                    {/* TODO: минимальное значение - 0 */}
                    <input type="text" className="form-control" placeholder="Возраст" name="age" value={curAge} onChange={e => setCurAge(e.target.value)}/>
                    
                    {/* TODO: Максимальное значение - 10, минимальное - 0 */}
                    <input type="text" className="form-control" placeholder="Рейтинг" name="rate" value={curRate} onChange={e => setCurRate(e.target.value)}/>
                    <input type="text" className="form-control" placeholder="Описание" name="description" value={curDescription} onChange={e => setCurDescription(e.target.value)}/>
                    <button type="submit" className="btn btn-primary">Добавить</button>
                </form>
            </div>
        </div>
}