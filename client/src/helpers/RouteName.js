export const RouteIndex = "/";
export const RouteSignin = "/signin"; 
export const RouteSignup = "/signup";
export const RouteProfile = "/profile";
export const RouteCategoryDetails = "/categories";
export const RouteAddCategory = "/category/add";
export const RouteUpdateCategory = (category_id) => {
    if(category_id){
        return `/category/edit/${category_id}`
    } else{
        return '/category/edit/:category_id'
    }
};