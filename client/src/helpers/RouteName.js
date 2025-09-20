export const RouteIndex = "/";
export const RouteSignin = "/signin";
export const RouteSignup = "/signup";
export const RouteProfile = "/profile";
//Categories Routes
export const RouteCategoryDetails = "/categories";
export const RouteAddCategory = "/category/add";
export const RouteUpdateCategory = (category_id) => {
  if (category_id) {
    return `/category/edit/${category_id}`;
  } else {
    return "/category/edit/:category_id";
  }
};
//Blog Routes
export const RouteBlog = "/blog";
export const RouteAddBolg = "/blog/add";
export const RouteUpdateBlog = (blogid) => {
  if (blogid) {
    return `/blog/edit/${blogid}`;
  } else {
    return "/blog/edit/:blogid";
  }
};

export const RouteBlogDetails = (category, blog) => {
  if (!category || !blog) {
    return '/blog/:category/:blog';
  } else {
    return `/blog/${category}/${blog}`;
  }
};

export const RouteCategoryBlogs = (category) => {
  if (!category ) {
    return '/blog/:category';
  } else {
    return `/blog/${category}`;
  }
};
