export abstract class Canvas {
  public static width: number = 640;
  public static height: number = 400;
  public static context: CanvasRenderingContext2D;

  public static init(element: HTMLCanvasElement) {
    element.height = Canvas.height;
    element.width = Canvas.width;
    Canvas.context = element.getContext("2d");
  }

  public static fill(color: string) {
    Canvas.context.beginPath();
    Canvas.context.rect(0, 0, Canvas.width, Canvas.height);
    Canvas.context.fillStyle = color;
    Canvas.context.fill();
  }

  public static fill_rect(x: number, y: number, w: number, h: number, color: string) {
    Canvas.context.beginPath();
    Canvas.context.fillStyle = color;
    Canvas.context.fillRect(x, y, w, h);
  }

  public static draw_rect(x: number, y: number, w: number, h: number, color: string) {
    Canvas.context.beginPath();
    Canvas.context.lineWidth = 1;
    Canvas.context.strokeStyle = color;
    Canvas.context.rect(x, y, w, h);
    Canvas.context.stroke();
  }
}