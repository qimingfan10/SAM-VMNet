% function radius = getRadius(pointData, point)
%     % 从pointData中获取特定点的半径
%     for idx = 1:length(pointData)
%         if pointData(idx).x == point(1) && pointData(idx).y == point(2)
%             radius = pointData(idx).radius;
%             return;
%         end
%     end
%     radius = NaN; % 如果没有找到匹配的点，则设置半径为NaN
% end
function radius = getRadius(pointData, point)
    % 从pointData中获取特定点的半径
    for idx = 1:length(pointData)
        if all(pointData(idx).x == point(1)) && all(pointData(idx).y == point(2))
            radius = pointData(idx).radius;
            return;
        end
    end
    radius = NaN; % 如果没有找到匹配的点，则设置半径为NaN
end
