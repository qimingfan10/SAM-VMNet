% function R = MoMforSeg1(x0, y0, rr, image)
% aplha=0:pi/1800:2*pi;
% for i = 1:0.5:rr
%     x = x0+ i*cos(aplha);
%     y = y0+ i*sin(aplha);
%     for j = 1:length(aplha)
%         % 以中心点画圆，当圆形边界不等于255时，认为到达血管边界
%         if image(round(x(j)), round(y(j))) ~= 255 % && image(round(2*x0-x(j)), round(2*y0-y(j))) ~= 255 
%             R = abs(i);
% %             ang = atan((y(j)-y0) / (x(j)-x0));
%             break;
%         else
%             R = [];
% %             ang = pi/4;
%         end
%     end
%     if ~isempty(R)
%         break;
%     end
% end
% if isempty(R)
%     R = 100;
% end
function R = MoMforSeg1(x0, y0, rr, image)
    aplha = 0:pi/1800:2*pi;
    for i = 1:0.5:rr
        x = x0 + i * cos(aplha);
        y = y0 + i * sin(aplha);
        for j = 1:length(aplha)
            % 确保索引在图像范围内
            if round(x(j)) > 0 && round(x(j)) <= size(image, 1) && ...
               round(y(j)) > 0 && round(y(j)) <= size(image, 2)
                % 以中心点画圆，当圆形边界不等于255时，认为到达血管边界
                if image(round(x(j)), round(y(j))) ~= 255 % && image(round(2*x0-x(j)), round(2*y0-y(j))) ~= 255
                    R = abs(i);
                    break;
                else
                    R = [];
                end
            end
        end
        if ~isempty(R)
            break;
        end
    end
    if isempty(R)
        R = 100;
    end
end
