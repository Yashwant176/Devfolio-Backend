import api from "@/api";

export async function getBlogs(page) {
  try {
    const response = await api.get(`blog_list/?page=${page}`);
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.detail || err.message);
  }
}

export async function getBlog(slug) {
  try {
    const response = await api.get(`blogs/${slug}`);
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function registerUser(data) {
  try {
    const response = await api.post("register_user/", data);
    return response.data;
  } catch (err) {
    console.log(err);
    if (err.status == 400) {
      throw new Error("Username already exists");
    }
    throw new Error(err);
  }
}

export async function signin(data) {
  try {
    const response = await api.post("token/", data); // make sure backend uses this endpoint
    return response.data; // must include access & refresh
  } catch (err) {
    if (err.response?.status === 401) {
      throw new Error("Invalid credentials");
    }
    throw new Error(err.response?.data?.detail || "Login failed");
  }
}


export async function getUsername() {
  try {
    const response = await api.get("get_username");
    return response.data;
  } catch (err) {
    if (err.response?.status === 401) {
      throw new Error("Unauthorized: please login again");
    }
    throw new Error(err.response?.data?.detail || err.message);
  }
}

export async function createBlog(data) {
  try {
    const response = await api.post("create_blog/", data);
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function updateBlog(data, id) {
  try {
    const response = await api.put(`update_blog/${id}/`, data);
    return response.data;
  } catch (err) {
    if (err.response) {
      throw new Error(err.response?.data?.message || "Failed to update blog");
    }

    throw new Error(err.message);
  }
}

export async function deleteBlog(id) {
  try {
    const response = await api.post(`delete_blog/${id}/`);
    return response.data;
  } catch (err) {
    if (err.response) {
      throw new Error(err.response?.data?.message || "Failed to delete blog");
    }

    throw new Error(err.message);
  }
}

export async function getUserInfo(username) {
  try {
    const response = await api.get(`get_userinfo/${username}`);
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function updateProfile(data) {
  try {
    const response = await api.put(`update_user/`, data);
    return response.data;
  } catch (err) {
    console.log(err)
    if (err.response) {
      throw new Error(
        err?.response?.data.username[0] || "Failed to update profile"
      );
    }

    throw new Error(err.message);
  }
}