const baseApi = "/api/"
const request_router = {
    account:
    {
      list:"account/list",
      new:"account/new",
      del:"account/del",
    },
    data:{
      list:"data/list",
      new:"data/new",
      lts:"data/lts",
      batch:{
        list:"data/batch/lts"
      }
    },
    config:{
      get:"config/type",
      update:"config/type"
    },
    monitor:
    {
      list:"monitor/list",
      new:"monitor/new",
      del:"monitor/del"
    },
    pgy:{
      updateAuth:"pgy/auth/new",
      data:{
        list:"pgy/data/list",
        new:"pgy/data/new",
        lts:"pgy/data/lts",
        batch:{
          list:"pgy/data/batch/lts"
        }
      },
      monitor:
      {
        list:"pgy/monitor/list",
        new:"pgy/monitor/new",
        del:"pgy/monitor/del"
      },
    }

};

async function requester(url: string, requestOptions: any) {
  try {
    return (await fetch(url, requestOptions)).json();
  } catch (e) {
    console.log("🐞 req error", e);
  }

  return false;
}

function request_method_get(headers: any) {
  var requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };

  return requestOptions;
}

function request_method_post(bodys: any, headers: any) {
  var requestOptions = {
    method: "POST",
    headers: headers,
    body: bodys,
    redirect: "follow",
  };

  return requestOptions;
}

function request_get_unauth() {
  return request_method_get({});
}
function request_post_unauth(data: any) {
  var h = new Headers();

  h.append("Content-Type", "application/json");

  return request_method_post(JSON.stringify(data), h);
}

async function api_account_list() {
  try {
    let path = baseApi+request_router.account.list;
    return await requester(
      path,
      request_get_unauth(),
    );
  } catch (e) {
    console.error(e);
    return [];
  }
}
async function api_account_del(id:any) {
  try {
    let path = baseApi+request_router.account.del+"?id="+id;
    return await requester(
      path,
      request_get_unauth(),
    );
  } catch (e) {
    console.error(e);
    return [];
  }
}

async function api_account_new(body:any) {
  try {
    let path = baseApi+request_router.account.new;
    return await requester(
      path,
      request_post_unauth(body),
    );
  } catch (e) {
    console.error(e);
    return [];
  }
}

async function api_monitor_list() {
  try {
    let path = baseApi+request_router.monitor.list;
    return await requester(
      path,
      request_get_unauth(),
    );
  } catch (e) {
    console.error(e);
    return [];
  }
}

async function api_monitor_del(id:any) {
  try {
    let path = baseApi+request_router.monitor.del+"?id="+id;
    return await requester(
      path,
      request_get_unauth(),
    );
  } catch (e) {
    console.error(e);
    return [];
  }
}
async function api_monitor_new(body:any) {
  try {
    let path = baseApi+request_router.monitor.new;
    return await requester(
      path,
      request_post_unauth(body),
    );
  } catch (e) {
    console.error(e);
    return [];
  }
}

async function api_data_list() {
  try {
    let path = baseApi+request_router.data.list;
    return await requester(
      path,
      request_get_unauth(),
    );
  } catch (e) {
    console.error(e);
    return [];
  }
}
async function api_data_lts() {
  try {
    let path = baseApi+request_router.data.lts;
    return await requester(
      path,
      request_get_unauth(),
    );
  } catch (e) {
    console.error(e);
    return [];
  }
}
async function api_data_new() {
  try {
    let path = baseApi+request_router.data.new;
    return await requester(
      path,
      request_get_unauth(),
    );
  } catch (e) {
    console.error(e);
    return [];
  }
}

async function api_data_batch_list() {
  try {
    let path = baseApi+request_router.data.batch.list;
    return await requester(
      path,
      request_get_unauth(),
    );
  } catch (e) {
    console.error(e);
    return [];
  }
}
async function api_config() {
  try {
    let path = baseApi+request_router.config.get+"/global";
    return await requester(
      path,
      request_get_unauth(),
    );
  } catch (e) {
    console.error(e);
    return [];
  }
}


// ======================= PGY DATA ======================= //
async function api_pgy_data_list() {
  try {
    const path = baseApi + request_router.pgy.data.list;
    return await requester(path, request_get_unauth());
  } catch (e) {
    console.error(e);
    return [];
  }
}

async function api_pgy_data_new() {
  try {
    const path = baseApi + request_router.pgy.data.new;
    return await requester(
      path,
      request_get_unauth(),
    );
  } catch (e) {
    console.error(e);
    return [];
  }
}

async function api_pgy_auth_new() {
  try {
    const path = baseApi + request_router.pgy.updateAuth;
    return await requester(
      path,
      request_get_unauth(),
    );
  } catch (e) {
    console.error(e);
    return [];
  }
}


async function api_pgy_data_lts() {
  try {
    const path = baseApi + request_router.pgy.data.lts;
    return await requester(path, request_get_unauth());
  } catch (e) {
    console.error(e);
    return [];
  }
}

async function api_pgy_data_batch_list() {
  try {
    const path = baseApi + request_router.pgy.data.batch.list;
    return await requester(path, request_get_unauth());
  } catch (e) {
    console.error(e);
    return [];
  }
}

// ======================= PGY MONITOR ======================= //
async function api_pgy_monitor_list() {
  try {
    const path = baseApi + request_router.pgy.monitor.list;
    return await requester(path, request_get_unauth());
  } catch (e) {
    console.error(e);
    return [];
  }
}

async function api_pgy_monitor_new(body: any) {
  try {
    const path = baseApi + request_router.pgy.monitor.new;
    return await requester(path, request_post_unauth(body));
  } catch (e) {
    console.error(e);
    return [];
  }
}

async function api_pgy_monitor_del(id: any) {
  try {
    const path = baseApi + request_router.pgy.monitor.del + "?id=" + id;
    return await requester(path, request_get_unauth());
  } catch (e) {
    console.error(e);
    return [];
  }
}
export {
  api_account_list,
  api_account_new,
  api_monitor_list,
  api_monitor_new,
  api_data_list,
  api_data_lts,
  api_data_new,
  api_data_batch_list,
  api_config,
  api_account_del,
  api_monitor_del,
  api_pgy_auth_new,
  // New PGY
  api_pgy_data_list,
  api_pgy_data_new,
  api_pgy_data_lts,
  api_pgy_data_batch_list,
  api_pgy_monitor_list,
  api_pgy_monitor_new,
  api_pgy_monitor_del,
};