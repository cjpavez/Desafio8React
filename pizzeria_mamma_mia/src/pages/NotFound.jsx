function NotFound(){
    return(
        <>
            <div className="notFound">
                <i className="fa-solid fa-face-sad-cry notFoundIcon" aria-hidden="true"></i>
                <h1>Esta página web no está disponible</h1>
                <p>Puede deberse a un error técnico que estamos intentando solucionar</p>
            </div>
        </>
    );
};

export default NotFound;