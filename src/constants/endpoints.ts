const API_PREFIX = "";
// ví dụ về những cái endpoint
const propritiesEndpoint = {
  GET_ALL_PROPRITIES: `${API_PREFIX}/proprities`,
  GET_ID_PROPRITIES: `${API_PREFIX}/proprities/{ID}`,
  CRAETE_PROPERTY: `${API_PREFIX}/proprities/createProprityDto`,
  Del_ID_PROPRITIES: `${API_PREFIX}/proprities/deleteProperties/{ID}`,
  UPDATE_ID_PROPRITIES: `${API_PREFIX}/proprities/update-property/{ID}`,
  FILTER_PROPERTIES: `${API_PREFIX}/filtersearch/filterTinhThanhTypeKhoangGia`,
  DETAIL_PROPERTIES: `/proprities/{id}`,
  CREATE_TYPE_PROPERTIES: `${API_PREFIX}/proprities/createTypeProperties/{id}`,
};

const bannerEndpoint = {
  GET_ALL_BANNER: `${API_PREFIX}/Banner/getAllBanner`,
  CREATE_BANNER: `${API_PREFIX}/Banner/newBanner`,
  DELETE_BANNER: `${API_PREFIX}/Banner/deleteBanner/{id}`,
};
const provinceEndpoint = {
  GET_ALL_PROVINCE: `${API_PREFIX}/province`,
  GET_DISTRICTS: `${API_PREFIX}/province/{provinceID}/districts`,
  GET_WARDS: `${API_PREFIX}/province/district/{districtID}/wards`,
};
const albumEndpoint = {
  CRAETE_PROPERTY_IMG: `${API_PREFIX}/album/createImgList/{id}`,
  CRAETE_PROPERTY_VIDEO: `${API_PREFIX}/album/createVideo/{id}`,
  DELETE_ALBUM: `${API_PREFIX}/album/{id}`,
};
const authEndpoint = {
  LOGIN: `${API_PREFIX}/auth/login`,
  DETAIL: `${API_PREFIX}/auth/detail`,
  CHECK_TOKEN: `${API_PREFIX}/auth/checkToken?token={token}`,
};
const contactEndpoint = {
  SEND_CONTACT: `${API_PREFIX}/contact`,
  GET_CONTACT: `${API_PREFIX}/contact`,
  DELETE_CONTACT: `${API_PREFIX}/contact{id}`,
};

export {
  albumEndpoint,
  authEndpoint,
  bannerEndpoint,
  contactEndpoint,
  propritiesEndpoint,
  provinceEndpoint
};

