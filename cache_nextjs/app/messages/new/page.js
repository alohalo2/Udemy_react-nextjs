import { redirect } from 'next/navigation';

import { addMessage } from '@/lib/messages';
import { revalidatePath, revalidateTag } from 'next/cache';

export default function NewMessagePage() {
  async function createMessage(formData) {
    'use server';

    const message = formData.get('message');
    addMessage(message);
    // revalidatePath: 하나의 인자인 page | layout을 
    // 받지만 첫 번째 인자로 경로를 입력하고 
    // 두 번째 인자로 재 검증할 분류(page | layout)를 
    // 입력하면 해당하는 부분까지 캐싱 무효화 할 수 있다, 
    // 기본값은 page이다.
    // revalidatePath('/','layout');

    // revalidateTag: tag가 있는 page나 layout들을 재검증한다.
    revalidateTag('msg');
    redirect('/messages');
  }

  return (
    <>
      <h2>New Message</h2>
      <form action={createMessage}>
        <p className="form-control">
          <label htmlFor="message">Your Message</label>
          <textarea id="message" name="message" required rows="5" />
        </p>

        <p className="form-actions">
          <button type="submit">Send</button>
        </p>
      </form>
    </>
  );
}
