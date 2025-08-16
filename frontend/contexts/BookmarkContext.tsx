import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Question {
  id: string;
  question: string;
  answer: string;
  topic: string;
  difficulty: string;
}

interface BookmarkContextType {
  bookmarks: Question[];
  addBookmark: (question: Question) => void;
  removeBookmark: (questionId: string) => void;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
};

interface BookmarkProviderProps {
  children: ReactNode;
}

export const BookmarkProvider: React.FC<BookmarkProviderProps> = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<Question[]>([]);

  const addBookmark = (question: Question) => {
    setBookmarks(prev => {
      if (prev.some(b => b.id === question.id)) {
        return prev;
      }
      return [...prev, question];
    });
  };

  const removeBookmark = (questionId: string) => {
    setBookmarks(prev => prev.filter(b => b.id !== questionId));
  };

  return (
    <BookmarkContext.Provider value={{ bookmarks, addBookmark, removeBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
};
