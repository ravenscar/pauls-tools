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

	React.useEffect(() => {
		serializeRef.current = getters;
	}, Object.values(getters));

	// mount / unmount serialization;
	React.useEffect(() => {
		let loaded = false;
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
			loaded = true;
		};

		load();

		// save via ref on cleanup, if loading finished.
		return () => {
			const state = serializeRef.current;
			if (loaded && state) {
				const save = async () => {
					await setCacheItem(path, state);
				};
				save();
			}
		};
	}, []);
};
