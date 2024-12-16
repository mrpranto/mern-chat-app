import { toast } from "sonner";

export const notify_success = (message) => {
   return toast.success(message, {
        action:{
            label: "X"
        }
    });
}

export const notify_error = (message) => {
    return toast.error(message, {
         action:{
             label: "X"
         }
     });
 }

 export const notify_warning = (message) => {
    return toast.warning(message, {
         action:{
             label: "X"
         }
     });
 }