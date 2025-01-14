
import { redirect } from 'next/navigation';

import { storePost } from '@/lib/posts';
import PostForm from '@/components/post-form';

export default function NewPostPage() {

  async function createPost(prevState, formData) {
    "use server";
    const title = formData.get('title'); // get(): html 필드 name과 연결됨
    const image = formData.get('image');
    const content = formData.get('content');

    let errors = [];

    if(!title || title.trim().length === 0) {
      errors.push('Title is required.');
    }

    if(!content || content.trim().length === 0) {
      errors.push('Content is required.');
    }
    
    if(!image || image.size === 0) {
      errors.push('Image is required.');
    }

    if(errors.length > 0) {
      return { errors };
    }

    // 백엔드로 전달
    await storePost({
      imageUrl: '',
      title,
      content,
      userId: 1
    });

    redirect('/feed');
  }

  return <PostForm action={createPost} />
}
