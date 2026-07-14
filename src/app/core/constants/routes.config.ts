export interface RouteConfig {
  key: string;
  label: string;
  translationKey: string;
  path: string;
  icon?: string;
  children?: Record<string, RouteConfig>;
}

export interface SidebarMenuItem {
  key: string;
  label: string;
  translationKey: string;
  path: string;
  icon?: string;
  children?: SidebarMenuItem[];
}

export const ROUTES_CONFIG: Record<string, RouteConfig> = {
  HOME: {
    key: 'HOME',
    label: 'routes.home',
    translationKey: 'routes.home',
    path: '/',
    icon: 'home',
  },
  ORGANIZATION: {
    key: 'ORGANIZATION',
    label: 'routes.organization',
    translationKey: 'routes.organization',
    icon: 'global',
    path: '/organization',
    children: {
      COMPANY_LIST: {
        key: 'COMPANY_LIST',
        label: 'routes.companyList',
        translationKey: 'routes.companyList',
        icon: 'bank',
        path: '/organization/company',
      },
      BRANCH_LIST: {
        key: 'BRANCH_LIST',
        label: 'routes.branchList',
        translationKey: 'routes.branchList',
        icon: 'apartment',
        path: '/organization/branch',
      },
    },
  },
  HUMAN_RESOURCE: {
    key: 'HUMAN_RESOURCE',
    label: 'routes.humanResource',
    translationKey: 'routes.humanResource',
    icon: 'team',
    path: '/human-resource',
    children: {

    },
  },
  ROLE_MANAGER: {
    key: 'ROLE_MANAGER',
    label: 'routes.roleManager',
    translationKey: 'routes.roleManager',
    icon: 'safety',
    path: '/role-manager',
    children: {

    },
  },
  SETTING_SYSTEM: {
    key: 'SETTING_SYSTEM',
    label: 'routes.settingSystem',
    translationKey: 'routes.settingSystem',
    icon: 'setting',
    path: '/system-settings',
    children: {
    },
  },
};

export function getRouteByPath(path: string): RouteConfig | undefined {
  for (const key of Object.keys(ROUTES_CONFIG)) {
    const route = ROUTES_CONFIG[key];
    if (route.path === path) return route;
    if (route.children) {
      for (const childKey of Object.keys(route.children)) {
        if (route.children[childKey].path === path) return route.children[childKey];
      }
    }
  }
  return undefined;
}

export function getRouteByKey(key: string): RouteConfig | undefined {
  for (const k of Object.keys(ROUTES_CONFIG)) {
    const route = ROUTES_CONFIG[k];
    if (route.key === key) return route;
    if (route.children) {
      for (const childKey of Object.keys(route.children)) {
        if (route.children[childKey].key === key) return route.children[childKey];
      }
    }
  }
  return undefined;
}

export function convertRoutesToMenuItems(routes: Record<string, RouteConfig>): SidebarMenuItem[] {
  const items: SidebarMenuItem[] = [];
  const home = routes['HOME'];
  if (home) {
    items.push({
      key: home.key,
      label: home.label,
      translationKey: home.translationKey,
      path: home.path,
      icon: home.icon,
    });
  }
  for (const key of Object.keys(routes)) {
    if (key === 'HOME') continue;
    const route = routes[key];
    const item: SidebarMenuItem = {
      key: route.key,
      label: route.label,
      translationKey: route.translationKey,
      path: route.path,
      icon: route.icon,
    };
    if (route.children) {
      item.children = Object.keys(route.children).map((childKey) => {
        const child = route.children![childKey];
        return {
          key: child.key,
          label: child.label,
          translationKey: child.translationKey,
          path: child.path,
          icon: child.icon,
        };
      });
    }
    items.push(item);
  }
  return items;
}
