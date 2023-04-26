import Dexie, {Table} from 'dexie';
import React from 'react';

export interface CacheItem {
	key: string;
	stringifiedJson: string;
}

export class CacheStore extends Dexie {
	cache!: Table<CacheItem>;

	constructor() {
		super('cache');
		this.version(1).stores({
			cache: '++key', // Primary key and indexed props
		});
	}
}

const db = new CacheStore();

export const getCacheItem = async (
	key: string,
): Promise<object | undefined> => {
	const loaded = await db.cache.get(key);
	return loaded ? JSON.parse(loaded.stringifiedJson) : loaded;
};

export const setCacheItem = (key: string, jsonObject: object) =>
	db.cache.put({key, stringifiedJson: JSON.stringify(jsonObject)});

export const deleteCacheItem = (key: string) => db.cache.delete(key);

export const useSerialize = <
	G extends Record<string, any>,
	S extends Record<Extract<keyof G, string>, (thing: any) => void>,
>(
	path: string,
	getters: G,
	setters: S,
) => {
	type Serialized = Record<string, any>;
	const serializeRef = React.useRef<Serialized>();
	const [initialized, setInitialized] = React.useState(false);

	React.useEffect(() => {
		serializeRef.current = getters;
	}, Object.values(getters));

	// serialize on change
	React.useEffect(() => {
		const load = async () => {
			const item = (await getCacheItem(path)) as
				| Partial<Serialized>
				| undefined;

			if (item) {
				for (const name in getters) {
					const setFunc = setters[name];
					if (setFunc) {
						if (item[name] !== undefined) {
							try {
								setFunc(item[name]);
							} catch (e) {
								console.warn(
									`error deserializing into ${path}:${name} with ${JSON.stringify(
										item[name],
									)}`,
									e,
								);
							}
						}
					}
				}
			}
		};

		const save = async () => {
			const state = serializeRef.current;
			if (state) {
				await setCacheItem(path, state);
			}
		};

		if (!initialized) {
			// skip first render as we are loading
			load();
			setInitialized(true);
		} else {
			save();
		}
	}, Object.values(getters));
};
