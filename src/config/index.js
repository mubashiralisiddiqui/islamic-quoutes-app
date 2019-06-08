const base_url ='http://138.68.241.158/api'
export const api = {
    all_quotes : base_url +'/item/list_all',
    category_list:base_url+ '/category/list_all',
    getQuotes_by_category:(id)=>`${base_url}/item/item_by_category?id=${id}`
}