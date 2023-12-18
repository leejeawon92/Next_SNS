import PropTypes from 'prop-types';

const PostImages = ({images}) => {
  return (
    <div>이미지관련</div>
  )
}
PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object)
}
export default PostImages;