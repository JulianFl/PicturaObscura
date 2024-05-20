import { useMutation } from '@tanstack/react-query';
import { doc, setDoc } from 'firebase/firestore';

import { db } from '@/firebase';
import { UserDataProps } from '@/types/interfaces';

const sendUserData = async (data: { id: string; userData: UserDataProps }) => {
  const { id, userData } = data;
  if (Object.keys(userData).length > 0) {
    await setDoc(doc(db, 'pictura', `${id}`), userData);
  }
};
export function useSendData() {
  return useMutation({
    mutationFn: sendUserData,
  });
}
