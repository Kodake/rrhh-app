import Swal, { SweetAlertIcon } from "sweetalert2";

const Notifications = (title: string, text: string, icon: SweetAlertIcon) => {
    return (
        Swal.fire({
            title: `${title}`,
            text: `${text}`,
            icon: `${icon}`,
            confirmButtonColor: '#3085d6'
        })
    )
}

export default Notifications;