const optimizeRoutes = (hubs) => {
    return hubs.map(hub => {
      const optimizedRoutes = [...hub.routes].sort((a, b) => a.cost - b.cost);
      return { ...hub, routes: optimizedRoutes };
    });
  };
  
  export default { optimizeRoutes };