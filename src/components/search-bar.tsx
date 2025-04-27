'use client';
import {useState} from 'react';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import { Icons } from '@/components/icons';

interface SearchBarProps {
  onSearch: (query: string) => void;
}
export function SearchBar({onSearch}: SearchBarProps) {
  const [search, setSearch] = useState('');
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(search);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <Input
        type="text"
        placeholder="Unesite pretragu..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1"
      />
      <Button type="submit">
        <Icons.search className="mr-2 h-4 w-4" />
        Pretraži
      </Button>
    </form>
  );
}

