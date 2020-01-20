import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOG':
      return action.data
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'REMOVE_BLOG':
      return state.filter(b => b.id.toString() !== action.data.toString())
    case 'UPDATE_BLOG':
      const toChange = state.find(b => b.id === action.data.id)
      const changed = { 
        ...toChange, 
        likes: action.data.likes
      }
      return state
        .map(b => b.id !== action.data.id ? b : changed)
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOG',
      data: blogs
    })
  }
}

export const addLikeBlog = (blog) => {
  return async dispatch => {
    const updatedBlog = await blogService.addLike(blog)
    dispatch({
      type: 'UPDATE_BLOG',
      data: updatedBlog
    })
  }
}

export const newBlog = (title, author, url) => {
  const newBlog = {
    'title': title,
    'author': author,
    'url': url,
    'likes': 0
  }

  return async dispatch => {
    const blog = await blogService.createBlog(newBlog)
    dispatch({
      type: 'NEW_BLOG',
      data: blog
    })
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    await blogService.removeBlog(id)
    dispatch({
      type: 'REMOVE_BLOG',
      data: id
    })
  }
}

export default reducer