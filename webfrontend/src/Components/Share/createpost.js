import React, { useState, useRef } from "react";
import './createpost.css';
import addPostIcon from '../../assets/addposticon.png';
import { StarRating } from "./starrating.tsx";

function CreatePost() {

    const userId = localStorage.getItem("userId");

    const inputRef = useRef();
    const [selectedFile, setSelectedFile] = useState(null);
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const [inputKey, setInputKey] = useState(Date.now());

    const handleFileChange = (event) => {
        if(event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const onChooseFile = () => {
        inputRef.current.click();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedFile) {
            alert("Lütfen bir fotoğraf seçin.");
            return;
        }
        if (rating === 0) {
            alert("Lütfen bir puan verin.");
            return;
        }
        if (!review.trim()) {
            alert("Lütfen bir değerlendirme yazın.");
            return;
        }
        try {
            const formData = new FormData();
            formData.append("userId", userId);
            formData.append("photo", selectedFile);
            formData.append("rating", rating);
            formData.append("review", review);

            const response = await fetch('/post/create', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                alert("Paylaşım başarılı!");
                setSelectedFile(null);
                setRating(0);
                setReview("");
                setInputKey(Date.now()); // input'u sıfırla
            } else {
                alert("Paylaşım başarısız. Lütfen tekrar deneyin.");
            }
        } catch (error) {
            alert("Bağlantı hatası: " + error.message);
        }
    };

    return (
        <div>
           <div className="createpost-card">
            <h1>Yeni Değerlendirme</h1>
            <p className="createpost-card-subtitle">Siparişinizi değerlendirin ve deneyiminizi paylaşın.</p>
            <form onSubmit={handleSubmit}>
                <p className="createpost-card-photolabel">Fotoğraf Yükle</p>
                <input 
                    ref={inputRef}
                    type="file" 
                    onChange={handleFileChange}
                    accept="image/*"
                    style={{display: 'none'}}
                    required
                    key={inputKey}
                />
                <br></br>
                {!selectedFile && (
                    <button type="button" className="createpost-file-button" onClick={onChooseFile}>
                        <img src={addPostIcon} alt="back"/>
                        <span>Fotoğraf yüklemek için tıklayın veya sürükleyin</span>
                    </button>
                )}

                {selectedFile && (
                    <div className="createpost-file-button" onClick={onChooseFile} style={{cursor: "pointer"}}>
                        <img
                            src={URL.createObjectURL(selectedFile)}
                            alt="Seçilen"
                            style={{ width: "210px", height: "210px", objectFit: "cover", borderRadius: "8px" }}
                        />
                        <span>Başka bir fotoğraf seçmek için tıklayın</span>
                    </div>
                )}
                <br></br>
                <div className="createpost-buttonmiddle">
                    <button type="button" className="createpost-file-button2"  onClick={onChooseFile}>
                        <span className="createpost-buttontext">Fotoğraf Seç</span>
                    </button>
                </div>

                <br></br>
                <p className="createpost-card-starlabel">Puanınız</p>
                <div className="createpost-card-star">
                    <StarRating rating={rating} onChange={setRating} />
                    <span className="createpost-card-starrating">{rating > 0 ? `${rating}/5` : "Henüz puanlanmadı"}</span>
                </div>

                <br></br>
                <p className="createpost-card-reviewlabel">Değerlendirmeniz</p>
                <textarea 
                    className="createpost-textarea"
                    rows={3}
                    placeholder="Siparişiniz hakkında düşüncelerinizi paylaşın..."
                    value={review}
                    onChange={e => setReview(e.target.value)}
                />
                <br></br>
                <button type="submit" className="createpost-file-button3">
                        <span className="createpost-buttontext">Paylaş</span>
                 </button>
            </form>
            
            </div>
        </div>
    );
}
export default CreatePost;