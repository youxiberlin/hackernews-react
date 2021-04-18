const extractDomain = (url) => {
  const withoutHttp = url.split(/\/\//)[1];
  return withoutHttp.match(/^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/igm)[0];
};

export default extractDomain;
