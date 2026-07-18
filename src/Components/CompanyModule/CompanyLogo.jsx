import { useEffect, useState } from "react";
import api from "../../utils/axios";

function CompanyLogo() {
    const [photoUrl, setPhotoUrl] = useState("");

    useEffect(() => {
        const loadPhoto = async () => {
            try {
                const response = await api.get(
                    "/companies/get/photo",
                    {
                        responseType: "blob"
                    }
                );

                const imageUrl = URL.createObjectURL(response.data);
                setPhotoUrl(imageUrl);

            } catch (error) {
                console.error(error);
            }
        };

        loadPhoto();

        return () => {
            if (photoUrl) {
                URL.revokeObjectURL(photoUrl);
            }
        };
    }, []);

    return (
        <div>
            {photoUrl ? (
                <img
                    src={photoUrl}
                    width="120"
                    height={120}
                    className="rounded-circle border"   
                    alt="Student"
                />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default CompanyLogo;