import { useParams } from "react-router-dom";

const ServiceDetail = () => {
    const {id} = useParams()
    console.log(id);
    return (
        <div>
            
        </div>
    );
};

export default ServiceDetail;