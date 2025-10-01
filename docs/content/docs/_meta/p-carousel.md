<!-- This file was automatic generated. Do not edit it manually -->

<DocsPropsTable :data="[
  {
    "name": "as",
    "description": "<p>The element or component this component should render as.</p>\n",
    "type": "APrimitiveAsTag | Component",
    "required": false,
    "default": "\"div\""
  },
  {
    "name": "active",
    "description": "",
    "type": "boolean",
    "required": false,
    "default": "true"
  },
  {
    "name": "align",
    "description": "",
    "type": "AlignmentOptionType",
    "required": false,
    "default": "\"center\""
  },
  {
    "name": "arrows",
    "description": "<p>Display prev and next buttons to scroll the carousel.</p>\n",
    "type": "boolean",
    "required": false,
    "default": "false"
  },
  {
    "name": "autoHeight",
    "description": "<p>Enable Auto Height plugin</p>\n",
    "type": "boolean | Partial<CreateOptionsType<{ active: boolean; breakpoints: { [key: string]: Omit<Partial<any>, \"breakpoints\">; }; }>>",
    "required": false,
    "default": "false"
  },
  {
    "name": "autoplay",
    "description": "<p>Enable Autoplay plugin</p>\n",
    "type": "boolean | Partial<CreateOptionsType<OptionsType>>",
    "required": false,
    "default": "false"
  },
  {
    "name": "autoScroll",
    "description": "<p>Enable Auto Scroll plugin</p>\n",
    "type": "boolean | Partial<CreateOptionsType<OptionsType>>",
    "required": false,
    "default": "false"
  },
  {
    "name": "breakpoints",
    "description": "",
    "type": "{ [key: string]: Omit<Partial<CreateOptionsType<{ align: AlignmentOptionType; axis: AxisOptionType; container: string | HTMLElement | null; slides: string | HTMLElement[] | NodeListOf<HTMLElement> | null; containScroll: ScrollContainOptionType; direction: AxisDirectionOptionType; slidesToScroll: SlidesToScrollOptionType; dragFree: boolean; dragThreshold: number; inViewThreshold: number | number[]; loop: boolean; skipSnaps: boolean; duration: number; startIndex: number; watchDrag: DragHandlerOptionType; watchResize: ResizeHandlerOptionType; watchSlides: SlidesHandlerOptionType; watchFocus: FocusHandlerOptionType; }>>, \"breakpoints\">; }",
    "required": false,
    "default": "{}"
  },
  {
    "name": "classNames",
    "description": "<p>Enable Class Names plugin</p>\n",
    "type": "boolean | Partial<CreateOptionsType<OptionsType>>",
    "required": false,
    "default": "false"
  },
  {
    "name": "containScroll",
    "description": "",
    "type": "false | \"trimSnaps\" | \"keepSnaps\"",
    "required": false,
    "default": "\"trimSnaps\""
  },
  {
    "name": "dots",
    "description": "<p>Display dots to scroll to a specific slide.</p>\n",
    "type": "boolean",
    "required": false,
    "default": "false"
  },
  {
    "name": "dragFree",
    "description": "",
    "type": "boolean",
    "required": false,
    "default": "false"
  },
  {
    "name": "dragThreshold",
    "description": "",
    "type": "number",
    "required": false,
    "default": "10"
  },
  {
    "name": "duration",
    "description": "",
    "type": "number",
    "required": false,
    "default": "25"
  },
  {
    "name": "fade",
    "description": "<p>Enable Fade plugin</p>\n",
    "type": "boolean | Partial<CreateOptionsType<{ active: boolean; breakpoints: { [key: string]: Omit<Partial<any>, \"breakpoints\">; }; }>>",
    "required": false,
    "default": "false"
  },
  {
    "name": "inViewThreshold",
    "description": "",
    "type": "number | number[]",
    "required": false,
    "default": "0"
  },
  {
    "name": "items",
    "description": "",
    "type": "PCarouselItem[]",
    "required": false
  },
  {
    "name": "loop",
    "description": "",
    "type": "boolean",
    "required": false,
    "default": "false"
  },
  {
    "name": "next",
    "description": "<p>Configure the next button when arrows are enabled.</p>\n",
    "type": "PButtonProps",
    "required": false
  },
  {
    "name": "nextIcon",
    "description": "<p>The icon displayed in the next button.</p>\n",
    "type": "string | object",
    "required": false
  },
  {
    "name": "orientation",
    "description": "<p>The orientation of the carousel.</p>\n",
    "type": "\"vertical\" | \"horizontal\"",
    "required": false,
    "default": "\"horizontal\""
  },
  {
    "name": "prev",
    "description": "<p>Configure the prev button when arrows are enabled.</p>\n",
    "type": "PButtonProps",
    "required": false
  },
  {
    "name": "prevIcon",
    "description": "<p>The icon displayed in the prev button.</p>\n",
    "type": "string | object",
    "required": false
  },
  {
    "name": "skipSnaps",
    "description": "",
    "type": "boolean",
    "required": false,
    "default": "false"
  },
  {
    "name": "slidesToScroll",
    "description": "",
    "type": "number | \"auto\"",
    "required": false,
    "default": "1"
  },
  {
    "name": "startIndex",
    "description": "",
    "type": "number",
    "required": false,
    "default": "0"
  },
  {
    "name": "watchDrag",
    "description": "",
    "type": "DragHandlerOptionType",
    "required": false,
    "default": "true"
  },
  {
    "name": "watchFocus",
    "description": "",
    "type": "FocusHandlerOptionType",
    "required": false,
    "default": "true"
  },
  {
    "name": "watchResize",
    "description": "",
    "type": "ResizeHandlerOptionType",
    "required": false,
    "default": "true"
  },
  {
    "name": "watchSlides",
    "description": "",
    "type": "SlidesHandlerOptionType",
    "required": false,
    "default": "true"
  },
  {
    "name": "wheelGestures",
    "description": "<p>Enable Wheel Gestures plugin</p>\n",
    "type": "boolean | WheelGesturesPluginOptions",
    "required": false,
    "default": "false"
  },
  {
    "name": "pohon",
    "description": "",
    "type": "{ root?: ClassValue; viewport?: ClassValue; container?: ClassValue; item?: ClassValue; controls?: ClassValue; arrows?: ClassValue; prev?: ClassValue; next?: ClassValue; dots?: ClassValue; dot?: ClassValue; }",
    "required": false
  }
]" />

<DocsEmitsTable :data="[
  {
    "name": "select",
    "description": "",
    "type": "[selectedIndex: number]"
  }
]" />

<DocsSlotsTable :data="[
  {
    "name": "item",
    "description": "",
    "type": "PCarouselItem"
  },
  {
    "name": "index",
    "description": "",
    "type": "number"
  }
]" />
