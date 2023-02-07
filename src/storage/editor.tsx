import Dexie, {Table} from 'dexie';
import {useLiveQuery} from 'dexie-react-hooks';

export interface EditorFile {
	id?: number;
	content: string;
	title?: string;
	deleted?: boolean;
}

export class EditorStore extends Dexie {
	files!: Table<EditorFile>;
	config!: Table<{key: 'idOrder'; value: {id: number; title?: string}[]}>;

	constructor() {
		super('files');
		this.version(1).stores({
			files: '++id', // Primary key and indexed props
		});
		this.version(2).stores({
			config: '++key', // Primary key and indexed props
		});
	}
}

const db = new EditorStore();

export const useEditorFilelist = () => {
	return useLiveQuery(async () => {
		const loaded = await db.config.get('idOrder');

		const value = loaded?.value || [
			{id: 13, title: 'Foo'},
			{id: 2},
			{id: 0, title: 'page-placeholder.tsx'},
			{id: -3, title: 'Bar'},
			{id: 7, title: 'Baz'},
		];

		return value.map(({id, title}) => ({id, title: title || `<${id}>`}));
	});
};

export const upsertFile = async (file: EditorFile) => {
	let id = file.id;

	if (id) {
		await db.files.update(id, file);
	} else {
		id = (await db.files.add(file)) as Required<EditorFile>['id'];
	}

	return id;
};
