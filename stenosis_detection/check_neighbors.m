% % 定义一个函数来检查骨架点的邻居
% function neighbors = check_neighbors(BW, y, x)
%     neighbors = []; % 初始化邻居数组
%     % 检查周围9个领域的邻居
%     directions = [-1 -1; -1 0; -1 1; 0 -1; 0 1; 1 -1; 1 0; 1 1]; % 8个方向的对角线和中心点本身
%     for j = 1:size(directions, 1)
%         neighbor_pos = directions(j,:) + [y x];
%         % 确保邻居位置在图像范围内，并且是骨架点
%         if all(neighbor_pos >= 1) && all(neighbor_pos <= size(BW)) && any(BW(neighbor_pos(1), neighbor_pos(2)) == 1)
%             neighbors = [neighbors; neighbor_pos];
%         end
%     end
%     % 移除骨架点自身，中心点不应该算作邻居
%     neighbors = neighbors(neighbors(:,1) ~= y | neighbors(:,2) ~= x, :);
% end
function neighbors = check_neighbors(BW, y, x)
    neighbors = []; % 初始化邻居数组
    % 检查周围9个领域的邻居
    directions = [-1 -1; -1 0; -1 1; 0 -1; 0 1; 1 -1; 1 0; 1 1]; % 8个方向的对角线和中心点本身
    for j = 1:size(directions, 1)
        neighbor_pos = directions(j, :) + [y x];
        % 确保邻居位置在图像范围内，并且是骨架点
        if all(neighbor_pos >= 1) && all(neighbor_pos <= size(BW, 1)) && BW(neighbor_pos(1), neighbor_pos(2))
            neighbors = [neighbors; neighbor_pos];
        end
    end
    % 移除骨架点自身，中心点不应该算作邻居
    if ~isempty(neighbors)
        neighbors = neighbors(neighbors(:,1) ~= y | neighbors(:,2) ~= x, :);
    end
end