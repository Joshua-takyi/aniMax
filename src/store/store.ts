import { create } from "zustand";

interface SearchProp {
	search: string;
	setSearch: (search: string) => void;
}

const useSearch = create<SearchProp>((set) => ({
	search: "",
	setSearch: (search: string) => set({ search }),
}));
export default useSearch;
