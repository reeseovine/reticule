import { ArticleData } from '@extractus/article-extractor'

export interface Article extends ArticleData {
	added: Date
	id: number
}

export type LowData = {
	articles: Article[]
}
