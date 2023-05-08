declare const $: any;
/**
 * DEFINIZIONE RISORSE PER WEBKIT
 *
 *
 */
const webkitResources = [
  // {
  // 	entity: 'style',
  // 	name:
  // 		'https://fonts.googleapis.com/css?family=Dosis:400,600,700|Noto+Sans:400,700&display=swap',
  // 	media: 'all',
  // },
  { entity: 'style', name: 'css/style.css', media: 'all' },
  { entity: 'style', name: 'css/style-extra.css', media: 'all' },
  { entity: 'style', name: 'fonts/all.min.css', media: 'all' },
  // { entity: 'style', name: 'css/jquery-ui.css', media: 'screen' },
  { entity: 'style', name: 'css/toast.css', media: 'screen' },
  { entity: 'style', name: 'css/jquery-ui.min.css', media: 'screen' },

  // {
  //   entity: 'script',
  //   // name: 'js/jquery-1.12.4.min.js',
  //   name: 'fonts/all.min.js',
  //   type: 'text/javascript',
  // },
  {
    entity: 'script',
    // name: 'js/jquery-1.12.4.min.js',
    name: 'js/jquery/jquery-3.4.1.min.js',
    type: 'text/javascript',
  },
  {
    entity: 'script',
    name: 'js/jquery/jquery.scopeLinkTags.js',
    type: 'text/javascript',
  },
  {
    entity: 'script',
    name: 'js/bootstrap/bootstrap.bundle.min.js',
    type: 'text/javascript',
  },
  {
    entity: 'script',
    name: 'js/patterns/intranet-layout-sidebar.js',
    type: 'text/javascript',
  },
  {
    entity: 'script',
    name: 'js/patterns/tooltip.js',
    type: 'text/javascript',
  },
  {
    entity: 'script',
    name: 'js/bootstrap/bootstrap-select.min.js',
    type: 'text/javascript',
  },
  {
    entity: 'script',
    name: 'js/patterns/input-file/bs-custom-file-input.min.js',
    type: 'text/javascript',
  },
  {
    entity: 'script',
    name: 'js/patterns/input-file/input-file.js',
    type: 'text/javascript',
  },
  // {
  // 	entity: 'script',
  // 	name: 'js/moment.min.js',
  // 	type: 'text/javascript',
  // },
  {
    entity: 'script',
    name: 'js/patterns/input-date/locales/it.js',
    type: 'text/javascript',
  },
  {
    entity: 'script',
    name: 'js/patterns/input-date/datepicker.js',
    type: 'text/javascript',
  },
  {
    entity: 'script',
    name: 'js/patterns/input-date/jquery.datetimepicker.full.min.js',
    type: 'text/javascript',
  },
  {
    entity: 'script',
    name: 'js/patterns/popover.js',
    type: 'text/javascript',
  },
  /*	{
			entity: 'script',
			name: 'js/patterns/input-date/input-date.js.dis',
			type: 'text/javascript',
		},*/
  // {
  // 	entity: 'script',
  // 	name: 'js/sortable.min.js',
  // 	type: 'text/javascript',
  // },
  // {
  // 	entity: 'script',
  // 	name: 'js/jquery-sortable.js',
  // 	type: 'text/javascript',
  // },
  // {
  // 	entity: 'script',
  // 	name: 'js/dnd-sortable-list.js',
  // 	type: 'text/javascript',
  // },
  // {
  // 	entity: 'script',
  // 	name: 'js/tooltip.js',
  // 	type: 'text/javascript',
  // },
  {
    entity: 'script',
    name: 'js/patterns/field/field.js',
    type: 'text/javascript',
  },
  {
    entity: 'script',
    name: 'js/patterns/field/field-select.js',
    type: 'text/javascript',
  },
  {
    entity: 'script',
    name: 'js/patterns/form/form.js',
    type: 'text/javascript',
  },
  {
    entity: 'script',
    name: 'js/patterns/tabella/tabella.js',
    type: 'text/javascript',
  },
  {
    entity: 'script',
    name: 'js/owlcarousel2/owl.carousel.js',
    type: 'text/javascript',
  },
  {
    entity: 'script',
    name: 'js/jquery-ui.js',
    type: 'text/javascript',
  },
  // {
  // 	entity: 'script',
  // 	name: 'js/header.js',
  // 	type: 'text/javascript',
  // },
  // {
  // 	entity: 'script',
  // 	name: 'js/bootstrap-select.min.js',
  // 	type: 'text/javascript',
  // },
  // {
  // 	entity: 'script',
  // 	name: 'js/i18n/defaults-it_IT.min.js',
  // 	type: 'text/javascript',
  // },
  // {
  // 	entity: 'script',
  // 	name: 'js/pulsantiera-fixed.js',
  // 	type: 'text/javascript',
  // },
  // {
  // 	entity: 'script',
  // 	name: 'js/sidebar.js',
  // 	type: 'text/javascript',
  // },
  // {
  // 	entity: 'script',
  // 	name: 'js/jquery-ui.js',
  // 	type: 'text/javascript',
  // },
];

/**
 * Funzione di utility per inserire tag link di tipo icon nell'head
 * @param fileName
 */
function addIcon(fileName: string) {
  const head = document.head;
  const link = document.createElement('link');

  link.rel = 'shortcut icon';
  link.href = fileName;

  head.appendChild(link);
}

/**
 * Funzione di utility per inserire tag link di tipo stylesheet nell'head
 * @param fileName
 * @param type
 * @param media
 */
function addCss(fileName: string, type?: string, media?: string) {
  media = media || undefined;
  type = type || undefined;

  const head = document.head;
  const link = document.createElement('link');

  link.rel = 'stylesheet';
  link.href = fileName;

  if (type) {
    link.type = type;
  }

  if (media) {
    link.media = media;
  }

  head.appendChild(link);
}

/**
 * Coda che contiene le promise degli script in caricamento
 */
const scriptsQueue: any[] = [];

/**
 * Funzione di utility per inserire tag script nell'head
 * @param fileName
 * @param utf8
 * @param type
 */
export function addScript(fileName: string, utf8?: string | false, type?: string) {
  utf8 = utf8 || false;
  type = type || undefined;

  const head = document.head;
  const script = document.createElement('script');

  script.src = fileName;
  script.async = false;

  if (type) {
    script.type = type;
  }

  if (utf8) {
    script.charset = 'UTF-8';
  }

  const promise = new Promise((resolve) => {
    script.onload = () => {
      resolve(null);
    };
  });

  scriptsQueue.push(promise);

  head.appendChild(script);
}

function webkitLoading(cdn: string) {
  const scripts: any[] = [];
  webkitResources.forEach((r) => {
    const name = cdn + r.name;
    switch (r.entity) {
      case 'icon':
        addIcon(name);
        break;
      case 'style':
        addCss(name, r.type, r.media);
        break;
      case 'script':
        /*                scripts.push({
									'pos': 'body', 'value': {
										'type': 'src', 'attributes': {
											'src': name
										}
									}
								});*/
        addScript(name, undefined, r.type);
        break;
    }
  });
  return scripts;
}

/**
 * Funzione di utility per il caricamento delle risorse del webkit
 * @param cdn
 * @param bussolaUrl
 */
export function loadWebkit(cdn: string): Promise<any> {
  // webkitLoading(cdn);
  return Promise.all(scriptsQueue);
}
