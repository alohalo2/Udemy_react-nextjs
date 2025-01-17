import { unstable_noStore } from 'next/cache';

import Messages from '@/components/messages';
import { getMessages } from '@/lib/messages';

// 5초에 한 번씩 정적 페이지 생성(리렌더링)
// export const revalidate = 5;

// 캐싱 무효화
// export const dynamic = 'force-dynamic';

export default async function MessagesPage() {

  // 캐싱 무효화
  // const response = await fetch('http://localhost:8080/messages', {
  //   cache: 'no-store'
  // });

  // 캐싱 무효화
  // unstable_noStore();
  // const response = await fetch('http://localhost:8080/messages', {
  //   next: {tag: ['msg']},
  // });
  // const messages = await response.json();

  const messages = await getMessages();

  if (!messages || messages.length === 0) {
    return <p>No messages found</p>;
  }

  return <Messages messages={messages} />;
}
